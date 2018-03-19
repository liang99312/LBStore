/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.KeHu;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface KeHuService {

    public KeHu getKeHuById(Integer id);
    
    public List<KeHu> getAllKeHus();
    
    public boolean updateKeHu(KeHu keHu);
    
    public KeHu saveKeHu(KeHu keHu);
    
    public boolean deleteKeHu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<KeHu> queryKeHusByPage(HashMap map);

}
