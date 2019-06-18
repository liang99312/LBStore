/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.KeHuDao;
import com.lb.lbstore.domain.KeHu;
import com.lb.lbstore.service.KeHuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("keHuServiceImpl")
public class KeHuServiceImpl implements KeHuService {

    @Autowired
    private KeHuDao keHuDao;

    @Override
    public KeHu getKeHuById(Integer id) {
        return (KeHu) keHuDao.findObjectById(KeHu.class, id);
    }

    @Override
    public List<KeHu> getAllKeHus(Integer qy_id) {
        return keHuDao.getResult("from KeHu keHu where qy_id="+qy_id, null);
    }

    @Override
    public boolean updateKeHu(KeHu keHu) {
        return keHuDao.update(keHu);
    }

    @Override
    public KeHu saveKeHu(KeHu keHu) {
        int id = keHuDao.save(keHu);
        return (KeHu) keHuDao.findObjectById(KeHu.class, id);
    }

    @Override
    public boolean deleteKeHu(Integer id) {
        KeHu keHu = (KeHu) keHuDao.findObjectById(KeHu.class, id);
        if(keHu.getState() == 0){
            keHu.setState(-1);
            return keHuDao.update(keHu);
        }else if(keHu.getState() == -1){
            return keHuDao.deleteObjById("keHu", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select count(1) from KeHu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return keHuDao.getCount(sql, null);
    }

    @Override
    public List<KeHu> queryKeHusByPage(HashMap map) {
        String hql = "from KeHu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            hql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return keHuDao.getPageList(hql, null, Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public boolean existKeHu(Integer qy_id, Integer id, String mc) {
        return keHuDao.existKeHu(qy_id, id, mc);
    }

}
