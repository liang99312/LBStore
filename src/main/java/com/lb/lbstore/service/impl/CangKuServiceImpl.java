/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.CangKuDao;
import com.lb.lbstore.domain.CangKu;
import com.lb.lbstore.service.CangKuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("cangKuServiceImpl")
public class CangKuServiceImpl implements CangKuService {

    @Autowired
    private CangKuDao cangKuDao;

    @Override
    public CangKu getCangKuById(Integer id) {
        return (CangKu) cangKuDao.findObjectById(CangKu.class, id);
    }

    @Override
    public List<CangKu> getAllCangKus(Integer qy_id) {
        return cangKuDao.getResult("from CangKu cangKu where qy_id"+qy_id, null);
    }

    @Override
    public boolean updateCangKu(CangKu cangKu) {
        return cangKuDao.update(cangKu);
    }

    @Override
    public CangKu saveCangKu(CangKu cangKu) {
        int id = cangKuDao.save(cangKu);
        return (CangKu) cangKuDao.findObjectById(CangKu.class, id);
    }

    @Override
    public boolean deleteCangKu(Integer id) {
        CangKu cangKu = (CangKu) cangKuDao.findObjectById(CangKu.class, id);
        if(cangKu.getState() == 0){
            cangKu.setState(-1);
            return cangKuDao.update(cangKu);
        }else if(cangKu.getState() == -1){
            return cangKuDao.deleteObjById("cangKu", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from CangKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return cangKuDao.getCount(sql, null);
    }

    @Override
    public List<CangKu> queryCangKusByPage(HashMap map) {
        String hql = "from CangKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return cangKuDao.getPageList(hql, null, 1, 20);
    }

}
