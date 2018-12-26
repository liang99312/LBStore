/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.HuanKuDao;
import com.lb.lbstore.domain.HuanKu;
import com.lb.lbstore.service.HuanKuService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("huanKuServiceImpl")
public class HuanKuServiceImpl implements HuanKuService {

    @Autowired
    private HuanKuDao huanKuDao;

    @Override
    public HuanKu getHuanKuById(Integer id) {
        return (HuanKu) huanKuDao.findObjectById(HuanKu.class, id);
    }
    
    @Override
    public HuanKu getHuanKuDetailById(Integer id) {
        return  huanKuDao.getHuanKuDetailById(id);
    }

    @Override
    public boolean updateHuanKu(HuanKu huanKu) {
        return huanKuDao.updateHuanKu(huanKu);
    }

    @Override
    public HuanKu saveHuanKu(HuanKu huanKu) {
        int id = huanKuDao.saveHuanKu(huanKu);
        return (HuanKu) huanKuDao.findObjectById(HuanKu.class, id);
    }

    @Override
    public boolean deleteHuanKu(Integer id) {
        return huanKuDao.deleteHuanKu(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from HuanKu where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return huanKuDao.getCount(sql, null);
    }

    @Override
    public List<HuanKu> queryHuanKusByPage(HashMap map) {
        return huanKuDao.queryHuanKusByPage(map);
    }

    @Override
    public boolean dealHuanKu(HuanKu huanKu,Integer a01_id) {
        return huanKuDao.dealHuanKu(huanKu, a01_id);
    }

}